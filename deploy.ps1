# Barrio Energy - Deploy to Vercel (PowerShell)
# Usage: .\deploy.ps1

$ErrorActionPreference = "Stop"
$SiteDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$EnvFile = Join-Path $SiteDir ".env.deploy"

if (-Not (Test-Path $EnvFile)) {
    Write-Host "Missing .env.deploy file" -ForegroundColor Red
    exit 1
}

# Load env vars from .env.deploy
Get-Content $EnvFile | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $key = $matches[1].Trim()
        $val = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($key, $val, "Process")
    }
}

$token = $env:VERCEL_TOKEN
$orgId = $env:VERCEL_ORG_ID
$projectId = $env:VERCEL_PROJECT_ID

if (-Not $token -or -Not $orgId -or -Not $projectId) {
    Write-Host ".env.deploy must set VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Deploying to Vercel (production)..." -ForegroundColor Cyan
Write-Host "  Project dir: $SiteDir"
Write-Host "  Org ID:      $orgId"
Write-Host "  Project ID:  $projectId"
Write-Host ""

Set-Location $SiteDir
$env:VERCEL_ORG_ID = $orgId
$env:VERCEL_PROJECT_ID = $projectId

npx vercel --prod --yes --token $token

Write-Host ""
Write-Host "Deploy complete! Site: https://barrioenergy.com" -ForegroundColor Green
