using System;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PubSub;

namespace RecruitingTask.Workers
{
    internal class ShowCreatedMessages : BackgroundService
    {
        private readonly ILogger<ShowCreatedMessages> _logger;
        private readonly Hub _hub = Hub.Default;

        public ShowCreatedMessages(ILogger<ShowCreatedMessages> logger)
        {
            _logger = logger;
        }


        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _hub.Subscribe<ChickenWeightData>(OnChickenWeight);
            _hub.Subscribe<ChickenDropOffData>(OnChickenDropOff);
            _hub.Subscribe<ChickenGradeData>(OnChickenGrade);
            return Task.CompletedTask;
        }

        private void OnChickenDropOff(IChickenDropOffData obj)
        {
            // _logger.LogInformation("{Date} - {JsonObject}", DateTime.UtcNow, JsonConvert.SerializeObject(obj));
        }

        private void OnChickenGrade(IChickenGradeData obj)
        {
            // _logger.LogInformation("{Date} - {JsonObject}", DateTime.UtcNow, JsonConvert.SerializeObject(obj));
        }

        private void OnChickenWeight(IChickenWeightData obj)
        {
            // _logger.LogInformation("{Date} - {JsonObject}", DateTime.UtcNow, JsonConvert.SerializeObject(obj));
        }
    }
}