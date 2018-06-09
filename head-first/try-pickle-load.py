import pickle

man_out = []
other_out = []

with open('man_data.pickle', 'rb') as myrestoredata, open('other.pickle','rb') as myotherrestoredata:
	print(pickle.load(myrestoredata),pickle.load(myotherrestoredata))