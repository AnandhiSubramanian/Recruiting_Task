using Common;

namespace RecruitingTask.Controllers
{
    public interface IChickenWeightDataContainer
    {
        ChickenWeightData ActualWeightData { get; set; }
    }
}