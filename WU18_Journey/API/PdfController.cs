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

namespace WU18_Journey.API
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

        [HttpGet]
        [Route("/pdf")]
        public ActionResult pdf()
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









            string name = HttpContext.Request.Query["name"].ToString();

            var savePath = _hostingEnvironment.WebRootPath + "\\pdf\\" + name + ".pdf";

            var doc = new iTextSharp.text.Document(PageSize.A4);

            PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(savePath, FileMode.Create));

            doc.Open();
            var baseFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            var Color = BaseColor.Black;
            Font fontText = new Font(baseFont, 14, Font.NORMAL, Color);

            var baseFontHeader = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
            Font fontHeader = new Font(baseFontHeader, 22, Font.BOLD, Color);

            var header = new Paragraph("här kommer en rubrik", fontHeader);
            doc.Add(header);

            var paragraph1 = new Paragraph("Här kommer en text", fontText);
            doc.Add(paragraph1);

            // SKAPAR TABLE

            var table = new Table(2);
            var cell = new Cell(new Phrase("Rubrik"));
            cell.Colspan = 2;
            cell.BackgroundColor = BaseColor.Pink;
            cell.HorizontalAlignment = 1;

            table.AddCell(cell);

            table.AddCell("ProduktId");
            table.AddCell(1.ToString());
            table.AddCell("ProduktName");
            table.AddCell("Produkten");
            table.AddCell("Pris");
            table.AddCell("100.00 SEK");

            doc.Add(table);

            // ADDING IMAGE
            
            var image = Image.GetInstance("c:\\Temp\\SKV\\SKV_RGB_st.jpg");
            image.SetAbsolutePosition(5, 5);
            doc.Add(image);


            var chunk = new Chunk("This is a chunk!");
            chunk.SetUnderline(1, -1.5f);
            doc.Add(chunk);


            doc.Close();

            return Ok(name + ".pdf");
        }
    }
}