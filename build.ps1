$user = "tabletmira"
$domain = "www"
$path = "/home/$user/$domain"

yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* agenciaboz:$path
ssh -p 22022 agenciaboz "chown -R $user`:$user $path/*"
