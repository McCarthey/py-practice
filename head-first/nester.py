def print_lol(the_list, indent=Flase, level=0):
    for each_item in the_list:
        if isinstance(each_item, list):
            print_lot(each_item, indent, level+1)
        else:
            if indent:
                for tab in range(level):
                    print('\t', end='')
            print(each_item)
