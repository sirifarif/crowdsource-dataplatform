\a
\t
\o ageGroupContributions.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  age_group, count(*) as contributions, ROUND(sum(contribution_audio_duration)::decimal/3600, 3) as hours_contributed,ROUND(sum(validation_audio_duration)::decimal/3600, 3) as hours_validated, count(distinct(contributed_by)) as speakers from contributions_and_demo_stats  group by age_group ORDER BY contributions DESC)t;

\o genderGroupContributions.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  gender,count(*) as contributions, ROUND(sum(contribution_audio_duration)::decimal/3600, 3) as hours_contributed,ROUND(sum(validation_audio_duration)::decimal/3600, 3) as hours_validated, count(distinct(contributed_by)) as speakers from contributions_and_demo_stats  group by gender ORDER BY contributions DESC)t;

\o dailyTimeline.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  day, month, year, language, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations from daily_cumulative_stats_per_language )t;

\o dailyTimelineCumulative.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  day, month, year, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations from daily_cumulative_stats_all)t;

\o weeklyTimeline.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  year, week,language, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations from weekly_cumulative_stats_per_language )t;

\o weeklyTimelineCumulative.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  year, week, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations FROM weekly_cumulative_stats_all)t;

\o monthlyTimeline.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  year, month, language, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations from monthly_cumulative_stats_per_language )t;

\o monthlyTimelineCumulative.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  year, month, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations FROM monthly_cumulative_stats_all)t;

\o quarterlyTimeline.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  year, quarter, language, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations from quarterly_cumulative_stats_per_language )t;

\o quarterlyTimelineCumulative.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  year, quarter, ROUND(cumulative_contribution_duration::decimal/3600, 3) as cumulative_contributions,ROUND(cumulative_validation_duration::decimal/3600, 3) as cumulative_validations FROM quarterly_cumulative_stats_all)t;

\o cumulativeCount.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  count(distinct(language)) as total_languages,
count(distinct(contributed_by)) as total_speakers,ROUND((sum(contribution_audio_duration) FILTER (WHERE audio_row_num_per_contribution_id = 1 ))::numeric/3600,3)  as total_contributions,ROUND(sum(contributions_and_demo_stats.validation_audio_duration)::numeric/3600, 3)  as total_validations from contributions_and_demo_stats)t;

\o cumulativeDataByState.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( select coalesce(contribution_by_state.state, validation_by_state.state) as state, total_speakers, total_contributions, total_validations  
from 
(select contributions_state_region as state, 
count(distinct(contributed_by)) as total_speakers, 
ROUND((sum(contribution_audio_duration) FILTER (WHERE audio_row_num_per_contribution_id = 1 ))::numeric/3600,3)  as total_contributions 
from contributions_and_demo_stats  
group by contributions_state_region) as contribution_by_state FULL OUTER JOIN 
(select validations_state_region as state, 
ROUND(sum(contributions_and_demo_stats.validation_audio_duration)::numeric/3600, 3)  as total_validations 
from contributions_and_demo_stats  
group by validations_state_region) as validation_by_state on contribution_by_state.state = validation_by_state.state)t;


\o cumulativeDataByLanguage.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  language,
count(distinct(contributed_by)) as total_speakers,
ROUND((sum(contribution_audio_duration) FILTER (WHERE audio_row_num_per_contribution_id=1 ))::numeric/3600,3)  as total_contributions,
ROUND(sum(contributions_and_demo_stats.validation_audio_duration)::numeric/3600, 3)  as total_validations
from contributions_and_demo_stats group by language)t;

\o cumulativeDataByLanguageAndState.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( select coalesce(cs.state, vs.state) as state, coalesce(cs.language, vs.language) as language, total_speakers, total_contributions, total_validations 
from 
(select contributions_state_region as state, language,  
count(distinct(contributed_by)) as total_speakers, 
ROUND((sum(contribution_audio_duration) FILTER (WHERE audio_row_num_per_contribution_id = 1 ))::numeric/3600,3)  as total_contributions 
from contributions_and_demo_stats  
group by contributions_state_region,language) as cs 
FULL OUTER JOIN 
(select validations_state_region as state, language, 
ROUND(sum(contributions_and_demo_stats.validation_audio_duration)::numeric/3600, 3)  as total_validations 
from contributions_and_demo_stats  
group by validations_state_region, language) as vs 
on cs.state = vs.state and cs.language = vs.language)t;

\o listLanguages.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  distinct(language) from contributions_and_demo_stats)t;

\o topLanguagesBySpeakerContributions.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  language,count(distinct(contributed_by)) as total_speakers from contributions_and_demo_stats group by language ORDER BY total_speakers DESC LIMIT 5)t;

\o topLanguagesByHoursContributed.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  language,
ROUND((sum(contribution_audio_duration) FILTER (WHERE audio_row_num_per_contribution_id = 1 ))::numeric/3600,3)  as total_contributions from contributions_and_demo_stats group by language ORDER BY total_contributions DESC LIMIT 5)t;

\o lastUpdatedAtQuery.json 
SELECT array_to_json(array_agg(row_to_json (t))) FROM ( SELECT  max(lastupdated) AT TIME ZONE 'Asia/Kolkata' from audit_load_log)t;
