#!/bin/bash
# Convert any excel files into CSV files and move to InputToOS folder

for f in ./downloads/*.xlsx
do
java -jar ~/GDtoOCI/csvConverter/A8JXLS2CSV.jar "$f"
mv ~/GDtoOCI/csvConverter/downloads/*.csv ~/GDtoOCI/InputToOS
done
