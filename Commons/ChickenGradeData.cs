namespace Common
{
    public class ChickenGradeData : ChickenBasedMessage, IChickenGradeData
    {
        public Grade Grade { get; set; }
    }
}