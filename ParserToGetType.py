from os import read, write
import csv

# determine the type of pneumonia
findingType = ['Covid', 'Other', 'ViralPneumonia', 'Normal']

# extend the csv
# add the type
with open('D://CovidDataset/CovidDatasetBackup/newmetadata.csv', newline='') as csvfile:
    fieldnames = ['finding', 'filename', 'type']
    with open('D://CovidDataset/CovidDatasetBackup/newmetadata_2.csv', 'w', newline='') as writefile:
        writer = csv.DictWriter(writefile, fieldnames=fieldnames)
        writer.writeheader()
        reader = csv.DictReader(csvfile)
        for row in reader:
            if 'todo' in row['finding']:
                continue
            if 'COVID' in row['finding']:
                row['type'] = findingType[0]
            if 'COVID' not in row['finding'] and 'Viral' in row['finding']:
                row['type'] = findingType[2]
            if 'No Finding' in row['finding']:
                row['type'] = findingType[3]
            if 'Tuberculosis' in row['finding']:
                row['type'] = findingType[1]
            if 'Bacterial' in row['finding']:
                row['type'] = findingType[1]
            if 'Fungal' in row['finding']:
                row['type'] = findingType[1]
            if row['finding'] == 'Pneumonia':
                row['type'] = findingType[1]
            if 'Lipoid' in row['finding']:
                row['type'] = findingType[1]
            if 'Unknown' in row['finding']:
                row['type'] = findingType[1]
            if 'Aspiration' in row['finding']:
                row['type'] = findingType[1]
            writer.writerow(row)
        