import csv
from os import read

# make metadata
with open('D://CovidDataset/CovidDatasetBackup/metadata.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
#    for row in reader:
#        print(row['finding'], row['filename'])
    with open('D://CovidDataset/CovidDatasetBackup/newmetadata.csv', 'w', newline='') as writefile:
        fieldnames = ['finding', 'filename']
        writer = csv.DictWriter(writefile, fieldnames=fieldnames)

        writer.writeheader()
        for row in reader:
            writer.writerow({'finding' : row['finding'], 'filename' : row['filename']})

        