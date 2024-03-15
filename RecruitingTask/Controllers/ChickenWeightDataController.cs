using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace RecruitingTask.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ChickenWeightDataController : ChickenAbstractDataController<ChickenWeightData, ChickenWeightDataController>
    {
        private readonly IChickenWeightDataContainer _container;

        public ChickenWeightDataController(ILogger<ChickenWeightDataController> logger, IChickenWeightDataContainer container) : base(logger)
        {
            _container = container;
        }

        [HttpGet]
        public override IList<ChickenWeightData> Get()
        {
            return new List<ChickenWeightData>() { _container.ActualWeightData };
        }
    }
}