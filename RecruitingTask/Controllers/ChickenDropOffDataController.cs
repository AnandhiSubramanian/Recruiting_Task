using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace RecruitingTask.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChickenDropOffDataController : ChickenAbstractDataController<ChickenDropOffData, ChickenDropOffDataController>
    {
        private readonly IChickenDropOffDataContainer _container;

        public ChickenDropOffDataController(ILogger<ChickenDropOffDataController> logger, IChickenDropOffDataContainer container) : base(logger)
        {
            _container = container;
        }

        [HttpGet]
        public override IList<ChickenDropOffData> Get()
        {
            return new List<ChickenDropOffData>() { _container.ActualDropOffData };
        }
    }
}