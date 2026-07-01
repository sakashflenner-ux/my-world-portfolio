$nodeBin = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
$pnpm = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd"

if (-not (Test-Path -LiteralPath $pnpm)) {
  throw "没有找到 Codex 自带的 pnpm。请安装 Node.js 后运行 pnpm dev。"
}

$env:PATH = "$nodeBin;$env:PATH"
& $pnpm dev
