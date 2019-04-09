#!/bin/bash

export PATH="/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/opc/.local/bin:/home/opc/bin"

#change to javascript working directory (e.g. ~/GDtoOCI/csvConverter/)
cd ~/GDtoOCI/csvConverter/

#pull XLSX files to OCI VM ~/GDtoOCI/csvConverter/download
/usr/bin/node ~/GDtoOCI/csvConverter/MBGoogle.js
echo "download in progress..."

#convert XLSX files in download folder to CSV format and move to ~/GDtoOCI/InputToOS folder
bash ~/GDtoOCI/csvConverter/convert2CSV.sh
echo "conversion to CSV in progress..."

#clean csv file
/usr/bin/python /home/opc/GDtoOCI/csvConverter/convertNewLines/convertNewlines.py

#bash script to move OCI VM files to OCI object storage bucket dbaasinput
rclone copy ~/GDtoOCI/InputToOS oci:ATPstage
echo "data transfer in progress..."



