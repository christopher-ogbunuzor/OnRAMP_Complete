from git import Repo 
def lambda_handler(event, context): 
    project_name = event['github_project'] 
    org = event['github_org'] 
    git_url = "https://github.com/%s/%s" % (org, project_name) 
    print("Downloading repo from %s............" % git_url) 
    repo = Repo.clone_from(git_url, '/tmp/%s' % project_name)
    # https://github.com/chris-cloudreach/sunnychris



