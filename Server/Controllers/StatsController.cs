using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Helpers;
using Server.Models;
using Server.ViewModels;

namespace Server.Controllers
{
  [Produces("application/json")]
  [Route("api/stats")]
  [AllowAnonymous]

  public class StatsController : Controller
  {
    private readonly PhotoLabContext _context;

    public StatsController(PhotoLabContext photoLabContext)
    {
      _context = photoLabContext;
    }

    // Put api/stats/getsystemstats
    [HttpPut("putsystemstats")]
    //    [Authorize("Admin")]
    public IActionResult PutSystemStats([FromBody] SystemStatsViewModel systemStatsViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var startDate = new DateTime(2017, 11, 1);
      var endDate = new DateTime(2017, 12, 14);

      //      var stats = _context.SystemStats.Where(s => s.Date >= systemStatsViewModel.startDate &&
      //                                                  s.Date <= systemStatsViewModel.endDate).ToArray();
      var stats = _context.SystemStats.Where(s => s.Date >= startDate &&
                                                  s.Date <= endDate).ToArray();

      return Ok(stats);
    }


    // Put api/stats/getsystemstats
    [HttpPut("putfrontierstats")]
    //    [Authorize("Admin")]
    public IActionResult PuFrontierStats([FromBody] SystemStatsViewModel systemStatsViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var startDate = new DateTime(2017, 1, 1);
      var endDate = new DateTime(2017, 12, 1);

      FrontierStat[] stats = _context.FrontierStats.Where(s => s.StatDate >= startDate &&
                                                  s.StatDate <= endDate).ToArray();

      var formats = stats.Select(x => x.FormatId).Distinct();
      var sortedStats = stats.OrderBy(x => x.StatDate).ToList();
      var sortedStatsDistinct = sortedStats.Select(x => x.StatDate).Distinct();
      FrontierResult result = new FrontierResult
      {
        Labels = new List<DateTime>(),
        Datas = new List<FrontierResultData>()
      };
      foreach (var stat in sortedStatsDistinct)
      {
        result.Labels.Add(stat);
      }
      foreach (var format in formats)
      {
        result.Datas.Add(new FrontierResultData(format));

      }
      foreach (var stat in sortedStats)
      {
        foreach (var resultData in result.Datas)
        {
          if (stat.FormatId == resultData.Label)
          {
            resultData.Data.Add(stat.Quantity);
          }
        }
      }
      return Ok(result);
    }
    public struct FrontierResult
    {
      public List<DateTime> Labels;
      public List<FrontierResultData> Datas;

    }

    public struct FrontierResultData
    {
      public List<int> Data;
      public int Label;

      public FrontierResultData(int label)
      {
        Data = new List<int>();
        Label = label;
      }
    }


    // Put api/stats/getevidencestats
    [HttpPost("postevidencestat")]
    //    [Authorize("Admin")]
    public async Task<IActionResult> PostEvidenceStat([FromBody] EvidenceFormViewModel evidenceFormViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      string message;
      var evidenceStat = _context.EvidenceStats.FirstOrDefault(x => x.Id == evidenceFormViewModel.Id);
      if (evidenceStat == null)
      {
        evidenceStat = new EvidenceStat()
        {
          StatDate = evidenceFormViewModel.StatDate,
          SubmitDate = DateTime.UtcNow,
          Quantity = evidenceFormViewModel.Quantity,
          Proceeds = evidenceFormViewModel.Proceeds
        };
        _context.EvidenceStats.Add(evidenceStat);
        message = "Evidence added!";

      }
      else
      {
        evidenceStat.StatDate = evidenceFormViewModel.StatDate;
        evidenceStat.SubmitDate = DateTime.UtcNow;
        evidenceStat.Quantity = evidenceFormViewModel.Quantity;
        evidenceStat.Proceeds = evidenceFormViewModel.Proceeds;
      }
      await _context.SaveChangesAsync();
      message = "Evidence edited!";

      return new OkObjectResult(message);

    }

    // Put api/stats/getevidencestats
    [HttpPut("putevidencestats")]
    //    [Authorize("Admin")]
    public IActionResult PutEvidenceStats([FromBody] SystemStatsViewModel systemStatsViewModel)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var startDate = new DateTime(2017, 11, 1);
      var endDate = new DateTime(2017, 11, 30);

      //      var stats = _context.SystemStats.Where(s => s.Date >= systemStatsViewModel.startDate &&
      //                                                  s.Date <= systemStatsViewModel.endDate).ToArray();
      var stats = _context.EvidenceStats.Where(s => s.StatDate >= startDate &&
                                                  s.StatDate <= endDate).ToArray();

      return Ok(stats);
    }
  }
}