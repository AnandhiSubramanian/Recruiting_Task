using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace RecruitingTask.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChickenGradeDataController : ChickenAbstractDataController<ChickenGradeData, ChickenGradeDataController>
    {
        private readonly IChickenGradeDataContainer _container;

        public ChickenGradeDataController(ILogger<ChickenGradeDataController> logger, IChickenGradeDataContainer container) : base(logger)
        {
            _container = container;
        }

        [HttpGet]
        public override IList<ChickenGradeData> Get()
        {
            return new List<ChickenGradeData>() { _container.ActualGradeData };
        }
    }
}