# from git import Repo 
import subprocess
def lambda_handler(event, context): 
    project_name = event['github_project'] 
    org = event['github_org'] 
    git_url = "https://github.com/%s/%s" % (org, project_name) 
    # print("Downloading repo from %s............" % git_url) 
    
    # cmd = "cd /tmp && git clone" + git_url
    # subprocess.Popen(cmd, shell=True)
    # cmd2 = "ls /tmp/" + project_name
    cmd2 = "git --version"
    # p1=subprocess.Popen(cmd2, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    # out, err = p1.communicate()
    # print('out : {0}' .format(out))
    # print('error : {0}' .format(err))
    
    gitcommands = "cd /tmp && mkdir projectchris && git clone " + git_url + "&& cd sunnychris && ls -al"

    p2=subprocess.Popen(gitcommands, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    out2, err2 = p2.communicate()
    print('gitcommand out : {0}' .format(out2))
    print('git command error : {0}' .format(err2))
    
    # p1.wait()
    if p2.returncode == 0:
        print("success")
    else:
        print("fail")
    # repo = Repo.clone_from(git_url, '/tmp/%s' % project_name)
