namespace Common
{
    public class ChickenData : ChickenBasedMessage, IChickenDropOffData, IChickenGradeData, IChickenWeightData
    {
        public int DropOff { get; set; }
        public Grade Grade { get; set; }
        public double WeightInGram { get; set; }
    }
}