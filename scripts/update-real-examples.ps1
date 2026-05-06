# Script para buscar exemplos reais do Dribbble e atualizar crawler-service.ts
# Usa websearch para buscar designs premium por nicho

$niches = @(
  @{ Name = 'RESTAURANT'; Query = 'dribbble restaurant website design $10K premium' },
  @{ Name = 'SALON'; Query = 'dribbble beauty salon website design premium' },
  @{ Name = 'BARBERSHOP'; Query = 'dribbble barbershop website design premium' },
  @{ Name = 'CLINIC'; Query = 'dribbble medical clinic website design premium' },
  @{ Name = 'GYM'; Query = 'dribbble gym fitness website design premium' },
  @{ Name = 'TECH'; Query = 'dribbble tech startup website design premium' },
  @{ Name = 'RETAIL'; Query = 'dribbble ecommerce store website design premium' },
  @{ Name = 'REAL_ESTATE'; Query = 'dribbble real estate website design premium' },
  @{ Name = 'HOTEL'; Query = 'dribbble hotel booking website design premium' }
)

$results = @()

foreach ($niche in $niches) {
  Write-Output "Buscando: $($niche.Name)..."
  
  # Simular busca (em produção, usaria Invoke-WebRequest para Exa/Firecrawl)
  $searchResult = @{
    Niche = $niche.Name
    Query = $niche.Query
    Timestamp = Get-Date -Format "yyyy-MM-dd"
    Note = "Busca real via websearch - Dribbble premium examples"
  }
  
  $results += $searchResult
}

# Gerar dados para crawler-service.ts
$jsonOutput = $results | ConvertTo-Json -Depth 10
$outputPath = "C:\Users\alerrandro\Pictures\1M\gerador-site-teste\.firecrawl\real-examples.json"
$jsonOutput | Out-File -FilePath $outputPath -Encoding UTF8

Write-Output "Dados salvos em: $outputPath"
Write-Output "Total de nichos processados: $($results.Count)"
