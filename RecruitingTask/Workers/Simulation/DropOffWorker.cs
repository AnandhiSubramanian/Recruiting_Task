using System;
using Common;
using Microsoft.Extensions.Logging;
using PubSub;

namespace RecruitingTask.Workers.Simulation
{
    public class DropOffWorker : ShackleBasedBackgroundService<ChickenDropOffData>
    {
        private readonly Random _random = new();

        public DropOffWorker(ILogger<DropOffWorker> logger) : base(logger, Hub.Default)
        {
            InitialDelay = 15000;
        }

        protected override ChickenDropOffData GenerateChickenData()
        {
            return new ChickenDropOffData
            {
                ShackleId = NextShackleId(),
                Date = DateTime.UtcNow,
                DropOff = _random.Next(1, 16)
            };
        }
    }
}