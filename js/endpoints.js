
var serverMode = "temp"

function endpoint()
{
	if(serverMode === "localhost")
	{
		return "http://localhost:8081/"
	}
	else if(serverMode === "temp")
	{
		return "http://10.10.30.137:8081/"
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
		return "http://default-environment-nm5p9qwapp.elasticbeanstalk.com"
	}
}//end funciton endpoint
