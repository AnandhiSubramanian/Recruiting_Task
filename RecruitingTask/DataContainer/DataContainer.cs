using Common;
using PubSub;
using RecruitingTask.Controllers;

namespace RecruitingTask
{
    public class DataContainer : IChickenWeightDataContainer, IChickenGradeDataContainer, IChickenDropOffDataContainer
    {
        private readonly Hub _hub;

        public DataContainer()
        {
            _hub = Hub.Default;
            _hub.Subscribe<ChickenWeightData>(OnChickenWeightData);
            _hub.Subscribe<ChickenGradeData>(OnChickenGradeData);
            _hub.Subscribe<ChickenDropOffData>(OnChickenDropOffData);
        }

        private void OnChickenWeightData(ChickenWeightData obj)
        {
            ActualWeightData = obj;
        }
        private void OnChickenGradeData(ChickenGradeData obj)
        {
            ActualGradeData = obj;
        }
        private void OnChickenDropOffData(ChickenDropOffData obj)
        {
            ActualDropOffData = obj;
        }

        public ChickenDropOffData ActualDropOffData { get; set; }
        public ChickenWeightData ActualWeightData { get; set; }
        public ChickenGradeData ActualGradeData { get; set; }
    }
}