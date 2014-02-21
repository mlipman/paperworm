#!/usr/bin/env python
import sys

print sys.argv[1]
f = open(sys.argv[1], 'r+')
output = open('output.txt', 'w+')
output.write('\t\t[\n')
i = 1
for line in f:
	if len(line.rstrip())==0:
		continue
	output.write('\t\t\t{\n\t\t\t\t"page":'+str(i/13+1)+',\n')
	output.write('\t\t\t\t"pNumber":'+str(i)+',\n')
	output.write('\t\t\t\t"text":"'+line.rstrip()+'",\n')
	output.write('\t\t\t\t"highlights":[],\n')
	output.write('\t\t\t\t"notes":[],\n')
	output.write('\t\t\t\t"images":[]\n')
	output.write('\t\t\t},\n')
	i += 1
output.write('\t\t]\n')