using System;
using Common;
using MathNet.Numerics.Distributions;
using Microsoft.Extensions.Logging;
using PubSub;

namespace RecruitingTask.Workers.Simulation
{
    public class WeightMachineWorker : ShackleBasedBackgroundService<ChickenWeightData>
    {
        private readonly IContinuousDistribution _distribution;

        public WeightMachineWorker(ILogger<WeightMachineWorker> logger) : base(logger, Hub.Default)
        {
            _distribution = new Normal(2500, 267);
            InitialDelay = 100;
        }

        protected override ChickenWeightData GenerateChickenData()
        {
            return new ChickenWeightData
            {
                ShackleId = NextShackleId(),
                Date = DateTime.UtcNow,
                WeightInGram = _distribution.Sample()
            };
        }
    }
}