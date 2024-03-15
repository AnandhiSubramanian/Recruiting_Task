using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RecruitingTask.Controllers;
using RecruitingTask.Workers;
using RecruitingTask.Workers.Simulation;

namespace RecruitingTask
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var dataContainer = new DataContainer();

            return Host.CreateDefaultBuilder(args)
                .ConfigureServices((_, services) =>
                {
                    services.AddSingleton<IChickenDropOffDataContainer>(dataContainer);
                    services.AddSingleton<IChickenWeightDataContainer>(dataContainer);
                    services.AddSingleton<IChickenGradeDataContainer>(dataContainer);
                    services.AddHostedService<ShowCreatedMessages>();
                    services.AddHostedService<WeightMachineWorker>();
                    services.AddHostedService<DropOffWorker>();
                    services.AddHostedService<GradeMachineWorker>();
                }).ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}