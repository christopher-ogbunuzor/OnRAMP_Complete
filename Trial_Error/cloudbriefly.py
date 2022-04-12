from __future__ import print_function
import os
import subprocess

def lambda_handler(event, context):
    # The Git repository to clone
    
    remote_repository = 'https://github.com/chris-cloudreach/sunnychris.git'
    git_command = 'clone --depth 1'

    git_rpm_region = os.environ['AWS_REGION']
    git_rpm_download_url = '/'.join([
        'http://packages.%s.amazonaws.com' % git_rpm_region,
        '2018.03/updates/efaea6f6ba01/x86_64/Packages',
        'git-2.14.6-1.62.amzn1.x86_64.rpm'])

    git_rpm = git_rpm_download_url.split('/')[-1]  # git-2.14.6-1.62.amzn1.x86_64.rpm
    tmp_dir = '/tmp/%s' % '-'.join(git_rpm.split('-')[0:2])  # /tmp/git-2.14.6

    # Download, verify and unpack the Git RPM package
    print(subprocess.check_output(
        ' && '.join([
            'rm -fr %s' % tmp_dir,
            'mkdir %s' % tmp_dir,
            'cd %s' % tmp_dir,
            'curl -s -O %s' % git_rpm_download_url,
            'rpm -K %s' % git_rpm,  # Check the GnuPG signature
            'rpm2cpio %s | cpio -id' % git_rpm,
            'rm %s' % git_rpm
        ]),
        stderr=subprocess.STDOUT,
        shell=True))

    # Clone the remote Git repository
    print(subprocess.check_output(
        ' && '.join([
            'cd %s' % tmp_dir,
            ' '.join([
                'HOME=/var/task',
                'GIT_TEMPLATE_DIR=%s/usr/share/git-core/templates' % tmp_dir,
                'GIT_EXEC_PATH=%s/usr/libexec/git-core' % tmp_dir,
                '%s/usr/bin/git %s %s' % (tmp_dir, git_command, remote_repository)
            ])
        ]),
        stderr=subprocess.STDOUT,
        shell=True))