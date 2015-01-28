
var serverMode = "development"

function endpoint()
{
	if(serverMode === "localhost")
	{
		return "http://localhost:8080/"
	}
	else if(serverMode === "development")
	{
		return "http://default-environment-nm5p9qwapp.elasticbeanstalk.com/"
	}
	else if(serverMode === "production")
	{
		return "http://claimit.elasticbeanstalk.com/"
	}
	else if(serverMode === "staging")
	{
		return "http://claimit-backend-env-ycagthum3h.elasticbeanstalk.com/"
	}
}//end funciton endpoint
