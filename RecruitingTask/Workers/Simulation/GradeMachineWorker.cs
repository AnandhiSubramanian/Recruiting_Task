using System;
using Common;
using Microsoft.Extensions.Logging;
using PubSub;

namespace RecruitingTask.Workers.Simulation
{
    public class GradeMachineWorker : ShackleBasedBackgroundService<ChickenGradeData>
    {
        private static readonly Random _R = new();

        public GradeMachineWorker(ILogger<GradeMachineWorker> logger) : base(logger, Hub.Default)
        {
            InitialDelay = 12500;
        }

        private static T RandomEnumValue<T>()
        {
            var v = Enum.GetValues(typeof(T));
            return (T) v.GetValue(_R.Next(1, v.Length));
        }

        protected override ChickenGradeData GenerateChickenData()
        {
            return new ChickenGradeData
            {
                ShackleId = NextShackleId(),
                Date = DateTime.UtcNow,
                Grade = RandomEnumValue<Grade>()
            };
            ;
        }
    }
}