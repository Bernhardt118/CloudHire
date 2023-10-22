from email.policy import default
from sqlalchemy.schema import Sequence
import sqlalchemy
from datetime import datetime
from server import  db, ma

class TestClients(db.Model):
    clientID = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(500))
    avatar = db.Column(db.String(500))
    totalEarned = db.Column(db.Float)
    #confirmed = db.Column(db.Boolean, nullable = False, default = False)
    #confirmed_on = db.Column(db.DateTime, nullable = True)

    def __init__(self, email, password, avatar, totEar):
        self.email = email
        self.password = password
        self.avatar = avatar
        self.totalEarned = totEar
        #self.confirmed = confirmed
        #self.confirmed_on = None

    def __repr__(self):
        return '<CLientID: ' + str(self.clientID) + ' Client: ' + self.email + ' Password: ' + self.password + ' Total Earned: ' + str(self.totalEarned)
        
        
class TestCompanies(db.Model):
    compID = db.Column(db.Integer, primary_key=True)
    companyName = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(500))
    companyLogo = db.Column(db.String(500))
    genIndus = db.Column(db.String(200))


    def __init__(self, companyName, password, companyLogo, genIndus):
        self.companyName = companyName
        self.password = password
        self.companyLogo = companyLogo
        self.genIndus = genIndus
        

    def __repr__(self):
        return '<CompanyID: ' + str(self.compID) + ' Company: ' + self.companyName + ' Password: ' + self.password + ' General Industry: ' + self.genIndus
        
        
class TestContracts(db.Model):
    contractID = db.Column(db.Integer, primary_key=True)
    contractLen = db.Column(db.Integer)
    inORem = db.Column(db.Boolean)
    VOC = db.Column(db.Float)
    datep = db.Column(db.DateTime)
    pending = db.Column(db.Boolean)
    companyID = db.Column(db.Integer, db.ForeignKey('test_companies.compID'))
    clientID = db.Column(db.Integer, db.ForeignKey('test_clients.clientID'))
    active = db.Column(db.Boolean)

    def __init__(self, contractLen, inORem, VOC, datep, pending, compID, clientID, active):
        self.contractLen = contractLen
        self.inORem = inORem
        self.VOC = VOC
        self.datep = datep
        self.pending = pending
        self.companyID = compID
        self.clientID = clientID
        self.active = active

    def __repr__(self):
        return '<ContID ' + str(self.contractID) + " CompanyID: " + str(self.companyID) + " ClientID: " + str(self.clientID)

class PendingCon(db.Model):
    contractID = db.Column(db.Integer, db.ForeignKey('test_contracts.contractID'), primary_key=True)

    def __init__(self, ID):
        self.contractID = ID
    
    def __repr__(self):
        return "<ContractID: " + str(self.contractID)


class TestProgrammingLanCL(db.Model):
    ClientID = db.Column(db.Integer, db.ForeignKey('test_clients.clientID'), primary_key=True)
    java = db.Column(db.Boolean)
    C = db.Column(db.Boolean)
    CSharp = db.Column(db.Boolean)
    Cplusplus = db.Column(db.Boolean)
    React = db.Column(db.Boolean)
    Python = db.Column(db.Boolean)
    Assem = db.Column(db.Boolean)

    def __init__(self, ClientID, java, C, CSharp, Cplusplus, React, Python, Assem):
        self.ClientID = ClientID
        self.java = java
        self.C = C
        self.CSharp = CSharp
        self.Cplusplus = Cplusplus
        self.React = React
        self.Python = Python
        self.Assem = Assem

    def __repr__(self):
        return "ClientID: " + str(self.ClientID) + " Java: " + str(self.java) + " C: " + str(self.C) + " CSharp: " + str(self.CSharp) + " C++: " + str(self.Cplusplus) + " React: " + str(self.React) + " Python: " + str(self.Python) + " Assembly: " + str(self.Assem)

class TestProgrammingLanCon(db.Model):
    ContractID = db.Column(db.Integer, db.ForeignKey('test_contracts.contractID'), primary_key=True)
    java = db.Column(db.Boolean)
    C = db.Column(db.Boolean)
    CSharp = db.Column(db.Boolean)
    Cplusplus = db.Column(db.Boolean)
    React = db.Column(db.Boolean)
    Python = db.Column(db.Boolean)
    Assem = db.Column(db.Boolean)

    def __init__(self, contractID, java, C, CSharp, Cplusplus, React, Python, Assem):
        self.ContractID = contractID
        self.java = java
        self.C = C
        self.CSharp = CSharp
        self.Cplusplus = Cplusplus
        self.React = React
        self.Python = Python
        self.Assem = Assem

    def __repr__(self):
        return "ContractID: " + str(self.ContractID) + " Java: " + str(self.java) + " C: " + str(self.C) + " CSharp: " + str(self.CSharp) + " C++: " + str(self.Cplusplus) + " React: " + str(self.React) + " Python: " + str(self.Python) + " Assembly: " + str(self.Assem)

    
class BlockedCompanies(db.Model):
    rel = db.Column(db.Integer, primary_key=True)
    companyID = db.Column(db.Integer, db.ForeignKey('test_companies.compID'))
    clientID = db.Column(db.Integer, db.ForeignKey('test_clients.clientID'))
    blocked = db.Column(db.Boolean)

    def __init__(self, compID, clientID, blocked):
        self.companyID = compID
        self.clientID = clientID
        self.blocked = blocked

    def __repr__(self):
        return "ClientID: " + str(self.clientID) + " CompanyID: " + str(self.companyID) + " Blocked: " + str(self.blocked)

class applications(db.Model):
    rel = db.Column(db.Integer, primary_key=True)
    contractID = db.Column(db.Integer, db.ForeignKey('test_contracts.contractID'))
    companyID = db.Column(db.Integer, db.ForeignKey('test_companies.compID'))
    clientID = db.Column(db.Integer, db.ForeignKey('test_clients.clientID'))
    

    def __init__(self, conID, companyID, clientID ):
        self.contractID = conID
        self.companyID = companyID
        self.clientID = clientID

    def __repr__(self):
        return "ContractID: " + str(self.contractID) + " CompanyID: " + str(self.companyID) + " ClientID: " + str(self.clientID)


    