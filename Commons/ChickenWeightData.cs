namespace Common
{
    public class ChickenWeightData : ChickenBasedMessage, IChickenWeightData
    {
        public double WeightInGram { get; set; }
    }
}