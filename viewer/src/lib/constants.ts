export const TYPE_LABELS: Record<string, string> = {
  player: 'Players',
  team: 'Teams',
  league: 'Leagues',
  season: 'Seasons',
  match: 'Matches',
  venue: 'Venues',
  record: 'Records',
  metric: 'Metrics',
  methodology: 'Methodology',
  source: 'Sources',
  dossier: 'Dossier',
  research: 'Research',
  runbook: 'Runbooks',
  reference: 'References',
  index: 'Index',
}

export const SOURCE_BOUNDARY_LABELS: Record<string, { label: string; color: string }> = {
  derived_claims_only: { label: 'Derived claims', color: 'blue' },
  public_open_data: { label: 'Open data (CC BY 3.0)', color: 'green' },
  manual_curated_knowledge: { label: 'Curated', color: 'purple' },
  methodology_only: { label: 'Methodology', color: 'gray' },
  proprietary_source_not_redistributed: { label: 'Reference only', color: 'red' },
}
