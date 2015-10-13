using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using React;
using Newtonsoft.Json;
using System.IO;
using ReactJSWebForms.Model;
using System.Web.Mvc;
using IHtmlHelper = System.Web.Mvc.HtmlHelper;

namespace ReactJSWebForms.UserControls
{
    public partial class ReactUserControl : System.Web.UI.UserControl
    {

        public string SlideshowHtml { get; set; }
        public IHtmlString SlideshowJS { get; set; }
       

        protected void Page_Init(object sender, EventArgs e)
        {

            var env = AssemblyRegistration.Container.Resolve<IReactEnvironment>();
            var objectModel = new { data = LoadJson() };
            var reactComponent = env.CreateComponent("SlideshowUC", objectModel);
            var script = env.GetInitJavaScript();


            SlideshowHtml = reactComponent.RenderHtml();
            SlideshowJS = ReactInitJavaScript(script);
            
            

        }


        public static IHtmlString ReactInitJavaScript(string script)
        {

            var tag = new System.Web.Mvc.TagBuilder("script")
            {
                InnerHtml = script
            };

            return new HtmlString(tag.ToString());
        }




        public string LoadJson()
        {


            List<SlideshowItem> SlideshowItems = new List<SlideshowItem>();

            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47836/Chloe-Moo.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47836%2fChloe-Moo.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 0, ImageCaption = "Image 1", Name = "Image1", Summary = "Summary1", ImageAltText = "Image1AltText", Title = "Title 1"});
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47837/Dasha-Gold.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47837%2fDasha-Gold.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 1, ImageCaption = "Image 2", Name = "Image2", Summary = "Summary2", ImageAltText = "Image2AltText", Title = "Title 2" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "mrec", ItemIndex = 2, Name = "MREC1", Summary = "MREC1", Title = "" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47838/Georgia-Gardiner.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47838%2fGeorgia-Gardiner.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 3, ImageCaption = "Image 3", Name = "Image3", Summary = "Summary3", ImageAltText = "Image3AltText", Title = "Title 3" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2014/11/07/47839/Helen-O-Conner.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2014%2f11%2f07%2f47839%2fHelen-O-Conner.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 4, ImageCaption = "Image 4", Name = "Image4", Summary = "Summary4", ImageAltText = "Image4AltText", Title = "Title 4" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "mrec", ItemIndex = 5,  Name = "MREC2", Summary = "MREC2", Title = "" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2015/09/07/67082/New-York-str-RS15-2416.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2015%2f09%2f07%2f67082%2fNew-York-str-RS15-2416.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 6, ImageCaption = "Image 6", Name = "Image6", Summary = "Summary6", ImageAltText = "Image6AltText", Title = "Title 6" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "slide", Image = "//d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/Elle/2015/09/07/67091/New-York-str-RS15-8585.jpg?Image=%2fs3%2fdigital-cougar-assets%2fElle%2f2015%2f09%2f07%2f67091%2fNew-York-str-RS15-8585.jpg&AllowUpSizing=False&Height=840&MaxWidth=440&bgcolor=black", ItemIndex = 7, ImageCaption = "Image 7", Name = "Image7", Summary = "Summary7", ImageAltText = "Image7AltText", Title = "Title 7" });
            SlideshowItems.Add(new SlideshowItem { SlideType = "last", ItemIndex = 8, Name = "Last slide", Summary = "Last slide", Title = "Last slide" });
            
            var data = JsonConvert.SerializeObject(SlideshowItems);

            return data;
      
        }


    }
}