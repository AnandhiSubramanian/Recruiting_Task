using System;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PubSub;

namespace RecruitingTask.Workers.Simulation
{
    public abstract class ShackleBasedBackgroundService<T> : BackgroundService
    {
        public static uint CurrentShackleId;
        protected readonly Hub _hub;
        protected readonly ILogger _logger;


        protected ShackleBasedBackgroundService(ILogger logger, Hub hub)
        {
            _hub = hub;
            _logger = logger;
        }

        protected int InitialDelay { get; set; } = 0;

        protected abstract T GenerateChickenData();

        protected uint NextShackleId()
        {
            return ++CurrentShackleId % Constants.MaxShackleId;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(InitialDelay, stoppingToken);
            _logger.LogInformation("Worker started at: {time}", DateTimeOffset.Now);
            while (!stoppingToken.IsCancellationRequested)
                try
                {
                    await Task.Delay(Constants.ChickenDistanceDelayInMs, stoppingToken);
                    var chicken = GenerateChickenData();
                    await _hub.PublishAsync(chicken);
                }
                catch (Exception e)
                {
                    _logger?.LogError("Exception in ExecuteAsync of DropOffWorker", e);
                }
        }
    }
}