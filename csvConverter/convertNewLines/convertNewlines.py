import csv

with open('/home/opc/GDtoOCI/InputToOS/Requisition Templates Form New Responses.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    with open ('/home/opc/GDtoOCI/InputToOS/RequisitionResponses.csv', 'wb') as csv_file_write:
    	csv_writer = csv.writer(csv_file_write,  delimiter=',')

    	line_count = 0
    	for row in csv_reader:

    		for index, value in enumerate(row):
        		row[index] = value.replace("\n", "")

        	csv_writer.writerow(row)
