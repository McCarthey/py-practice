
import pickle

man = [1,2,3,4,5,'six']
other = {'name':'test'}
try:
	with open('man_data.pickle', 'wb') as mysavedata, open('other.pickle', 'wb') as myothersavedata:
		pickle.dump(man, mysavedata)
		pickle.dump(other, myothersavedata)
except IOError as err:
	print('File error: ' + str(err))
except pickle.PickleError as perr:
	print('Pickling.error: ' + str(perr))
