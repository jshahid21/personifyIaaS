#!/bin/bash

export PATH="/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/opc/.local/bin:/home/opc/bin"

#delete ATPstage bucket
rclone delete oci:ATPstage


