using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WU18_Journey.Models;

namespace WU18_Journey
{
    [Route("api/[controller]")] 
    [ApiController]
    public class PdfController : ControllerBase
    {

             private readonly WU18_JourneyContext _context;
            public readonly IHostingEnvironment _hostingEnvironment;

        public PdfController(IHostingEnvironment hostingEnvironment, WU18_JourneyContext context)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;

        }

        [HttpPost]
        [Route("/api/pdf")]
        public async Task<ActionResult> pdfAsync (Report report)
        {


         //   UserRoadtrips



            //var email = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            //var user = _context.Users
            //   .Where(x => x.Email == email)
            //   .Include(x => x.UserRoadtrips)
            //   .FirstOrDefault();


            //var obj = new LoggedInUser();
            //obj.email = user.Email;
            //// obj.defaultvehicle = user.DefaultVehicle;
            //obj.AvailableVehicles = user.AvailableVehicles;
            //obj.UserRoadtrips = user.UserRoadtrips;

            //user.UserRoadtrips.ToList()









            var name = HttpContext.Request.Query["name"].ToString();

            var path = _hostingEnvironment.WebRootPath + "\\pdf\\" + report.LicensePlate + ".pdf";

            var doc = new iTextSharp.text.Document(PageSize.A4.Rotate());

           using ( FileStream fs = new FileStream(path, FileMode.Create))
            {
                
           var writer = PdfWriter.GetInstance(doc, fs);



                var baseFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
                var Color = BaseColor.Black;
                Font fontText = new Font(baseFont, 14, Font.NORMAL, Color);

                var baseFontHeader = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
                Font fontHeader = new Font(baseFontHeader, 22, Font.BOLD, Color);


                doc.Open();

                var image = Image.GetInstance(_hostingEnvironment.WebRootPath + @"\IMG\SKV_RGB_st.png");
                image.SetAbsolutePosition(55, 540);
                doc.Add(image);


            var header = new Paragraph("här kommer en rubrik", fontHeader);
            doc.Add(header);

            var paragraph1 = new Paragraph("Här kommer en text", fontText);
            doc.Add(paragraph1);

            // SKAPAR TABLE

            var journeyReport = await _context.Roadtrip
                .Where(x => x.VehiclePlateNumber == report.LicensePlate)
                .ToListAsync();
                

                var textVehicleInfo = new Chunk("Nummerplåt: " + report.LicensePlate, fontText);
            doc.Add(textVehicleInfo);

            var textDateInfo = new Chunk("Datum: " + report.DateTimeStart + "Slutdatum: " + report.DateTimeStop);
            doc.Add(textDateInfo);

            var table = new Table(8);
            table.Padding = 5;
            table.DefaultHorizontalAlignment = 1;
            table.DefaultVerticalAlignment = Element.ALIGN_MIDDLE;
            table.Width = 100;

            var JourneyDate = new Cell("Datum");
            JourneyDate.Rowspan = 2;
            JourneyDate.BackgroundColor = BaseColor.Green;
            table.AddCell(JourneyDate);

            var Tachometer = new Cell("Mätarställning");
            Tachometer.Colspan = 2;
            Tachometer.BackgroundColor = BaseColor.Green;
            table.AddCell(Tachometer);

            var TotalLength = new Cell("Reselängd km");
            TotalLength.Rowspan = 2;
            TotalLength.BackgroundColor = BaseColor.Green;
            table.AddCell(TotalLength);

            var StartAddress = new Cell("Resans start, adress");
            StartAddress.Rowspan = 2;
            StartAddress.BackgroundColor = BaseColor.Green;
            table.AddCell(StartAddress);

            var Case = new Cell("Ärende och plats/företag/kontaktperson");
            Case.Rowspan = 2;
            Case.BackgroundColor = BaseColor.Green;
            table.AddCell(Case);

            var StopAddress = new Cell("Resans slut, adress");
            StopAddress.Rowspan = 2;
            StopAddress.BackgroundColor = BaseColor.Green;
            table.AddCell(StopAddress);

            var NotesUser = new Cell("Anteckningar (bilförare, tankning mm");
            NotesUser.Rowspan = 2;
            NotesUser.BackgroundColor = BaseColor.Green;
            table.AddCell(NotesUser);

            var StartMeter = new Cell("Start");
            StartMeter.BackgroundColor = BaseColor.Green;
            table.AddCell(StartMeter);

            var StopMeter = new Cell("Ankomst");
            StopMeter.BackgroundColor = BaseColor.Green;
            table.AddCell(StopMeter);

            foreach (var item in journeyReport)
            {
                if ((item.Date >= report.DateTimeStart.AddHours(2)) && (item.Date <= report.DateTimeStop.AddHours(25).AddMinutes(59)))
                {
                        try
                        {
                            table.AddCell(item.Date.ToString());
                    table.AddCell(item.RoadtripMilesStart.ToString());
                    table.AddCell(item.RoadtripMilesStop.ToString());
                    table.AddCell(item.TravelDistance.ToString());
                    table.AddCell(item.StartDestination.ToString());
                    table.AddCell(item.Matter);
                       
                            table.AddCell(item.StopDestination.ToString());
                       
                    table.AddCell(item.Note);
                        }
                        catch (Exception ex)
                        {
                            table.AddCell("");
                        }
                    }

            }



            doc.Add(table);
            
            doc.Close();

            writer.Close();


            }


            return Ok(path);
        }
    }
}