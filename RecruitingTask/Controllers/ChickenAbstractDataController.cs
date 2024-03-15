using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace RecruitingTask.Controllers
{
    public abstract class ChickenAbstractDataController<TDataType, TLoggerType> : ControllerBase
    {
        protected readonly ILogger<TLoggerType> _logger;

        public ChickenAbstractDataController(ILogger<TLoggerType> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public abstract IList<TDataType> Get();
    }
}