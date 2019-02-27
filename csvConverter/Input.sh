#!/bin/bash

export PATH="/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/opc/.local/bin:/home/opc/bin"

#pull XLSX files to OCI VM ~/csvConverter/download folder
/usr/bin/node ~/csvConverter/MBGoogle.js
echo "download in progress..."

#convert XLSX files in download folder to CSV format and move to ~/InputToOS folder
bash ~/csvConverter/convert2CSV.sh
echo "conversion to CSV in progress..."

#bash script to move OCI VM files to OCI object storage bucket dbaasinput
rclone copy ~/InputToOS oci:dbaasinput
echo "data transfer in progress..."



