yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* agenciaboz:/home/agenciaboz/mira.agenciaboz.com.br
ssh -p 22022 agenciaboz "chown -R agenciaboz:agenciaboz /home/agenciaboz/mira.agenciaboz.com.br/*"
