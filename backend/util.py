from datetime import datetime
from inspect import getblock
import json
from server import checkBlock, db, deleteTestCompanies, deleteTestContracts, getAllTestContractss, getclientID, jsonCon, sortedConLenA, sortedConLenD, updatePassCL
from models import TestCompanies, TestProgrammingLanCL, TestProgrammingLanCon
from models import TestClients
from models import TestContracts
from server import addCompany
from server import addClient
from server import addContract
from server import sortProgLan
from server import jsonCon
from server import initBlocks
from server import checkBlock
from server import updatePassCL
prog = []
# addCompany("DEFAULT", "DEFAULT", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "DEFAULT")
# addCompany("HAZZ", "Coffee", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "Coffee Shop")
# addCompany("EveTech", "Com123", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "Computer shop")
# addCompany("H&M", "qwerty", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "Fashion")
# addCompany("Block11", "Rockies", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "Indoor Climbing gym")
# addCompany("Steers", "Wacky", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "Fast Food")
# addCompany("Cornwall Hill College", "Gandalf", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", "School")

# addClient("DEFAULT", "DEFAULT", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)
# addClient("123@gmail.com", "123", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)
# addClient("BOB@gmail.com", "game", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)
# addClient("Dave@gmail.com", "Blame", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)
# addClient("Clint@gmail.com", "qwerty", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)
# addClient("Harry@gmail.com", "pot", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)
# addClient("Jane@gmail.com", "zan", "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnVubnklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80", prog)

date = datetime.now()
# addContract(0, True, 0, date, False, 1, 1, True, prog)
# addContract(5, False, 5000, date,False, 3, 5, False, prog)
# addContract(52, True, 15000, date,False, 5, 1, True, prog)
# addContract(23, True, 8000, date,False, 4, 3, False, prog)
# addContract(999, True, 30000, date,False, 6, 1, True, prog)
# addContract(2, False, 2000, date,False, 2, 2, False, prog)


#print(sortedConLenD())
# test = TestContracts.query.order_by(TestContracts.VOC.desc()).all()
#test1 = TestContracts.query.filter_by(contractID=4).first()
#testlist = [test, test1]
# list = jsonCon(test)
# for x in list:
#     print(x)


#print(updatePassCL(2,"123"))
#print(addContract(60, True, 123, date, 1, 1, True, prog))
# test = getAllTestContractss()
# print(test)
# i = 0
# p = []
# for x in test:
#     if not checkBlock(x.clientID, x.companyID):
#         p.append(x)
#     else:
#         i = i + 1

#print(p)
#deleteTestContracts(2)
deleteTestCompanies(2)





