#!/bin/bash
#bash script to move OCI object storage bucket dbaasinvoiceoutput files to VM oci_csv_outoput folder

export PATH="/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/opc/.local/bin:/home/opc/bin"


rclone copy oci:NetSuiteStage ~/GDtoOCI/OutputToVM

echo "data transfer in progress..." 
