
import json
from distutils.log import debug
from sre_constants import SUCCESS
from sys import modules
from unicodedata import name
from urllib import response
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt,get_jwt_identity,unset_jwt_cookies,jwt_required,JWTManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy import *
from datetime import datetime, timedelta
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

###############################
#  Setting up the flask app   #
###############################
"""Application-factory pattern"""
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ijuuyqxqrcgqzg:1b15f5f19d34a7dc0263bdad56743909720b6d785cc5a2591b1b921c614effae@ec2-99-80-73-211.eu-west-1.compute.amazonaws.com:5432/d8b5gfil6egnur'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
migrate = Migrate()
ma = Marshmallow()
cors = CORS()
app.config["JWT_SECRET_KEY"] = "asdfhlkajshdfljkalsdjfbkejfoiasdkjbnlcjdsafjhfiuwefjasfdlh"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)
SECURITY_PASSWORD_SALT = 'my_precious_two'
from models import TestClients, TestContracts, TestCompanies, TestProgrammingLanCL, TestProgrammingLanCon, PendingCon, BlockedCompanies, applications

# Initialize extensions
# To use the application instances above, instantiate with an application:
db.init_app(app)
migrate.init_app(app, db)
ma.init_app(app)
cors.init_app(app)

@app.route('/')
def home():
#Used to test if the connection was successful can be removed
    try:
        #db.session.query(text('1')).from_statement(text('SELECT 1')).all()
        #addCompany("Hazz", "DEFAULT", "DEFAULT", "DEFAULT")
        #addContract(0, True, 0, "DEFAULT", datetime.now(), 1, 1, True)
        #addClient("DEFAULT", "DEFAULT", "DEFAULT", 0)
        #cTs = str(getclientID("DEFAULT"))
        #cTs1 =  getEmailCl(1)
        return "Work"
    except Exception as e:
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text


@app.route('/loginCom', methods=["POST"])
def loginCom():
    CompanyName = request.json.get("companyName", None)
    password = request.json.get("password", None)

    IDC = getcompanyID(CompanyName)
    
    if IDC == 0:
        return jsonify("msg: No such company"), 401

    
    #if check_password_hash(getPasswordC(IDC), password) == False:
    if getPasswordC(IDC) != password:
        return jsonify({"msg": "Wrong password"}), 401
    
    access_token = create_access_token(identity=CompanyName)
    response = jsonify(access_token=access_token)
    return response

@app.route('/loginCl', methods=["POST"])
def loginCl():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    #progLan = request.json.get("prog", None)

    ID = getclientID(email)
    
    if ID == 0:
        return jsonify("msg: Wrong email"), 402

    #if check_password_hash(getPasswordCL(ID), password) == False:
    if getPasswordCL(ID) != password:
        return jsonify({"msg": "Wrong password"}), 403
    
    access_token = create_access_token(identity=email)
    response = jsonify(access_token=access_token)
    return response

@app.route('/logout', methods=["POST"])
def logout():
    response = jsonify({"msg":"logout successful"})
    #unset_jwt_cookies(response)
    return response

########################################################
#    Routing to the different registration pages       #
########################################################
@app.route('/user_register', methods=["POST"])
def user_reg():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    avatar =  request.json.get("avatar", None)
    progLan = request.json.get("progLan", None)
    totalEarn = 0
    ID = getclientID(email)
    password_hash = generate_password_hash(password)
    if ID != 0:
        response = jsonify({"msg":"email already used"})
        return response

    if addClient(email, password, avatar, progLan) != None:
        response = jsonify("Error adding Client")
        return response

    response = jsonify({"msg":"user registered"})


    return response


@app.route('/company_reg',  methods=["POST"])
def company_reg():
    CompanyName = request.json.get("companyname", None)
    password = request.json.get("password", None)
    logo =  request.json.get("companylogo", None)
    genIndus = request.json.get("genin", None)

    ID = getcompanyID(CompanyName)
    password_hash = generate_password_hash(password)
    if ID != 0:
        response = jsonify({"msg":"Company Name already used"})
        return response
    
    if addCompany(CompanyName, password, logo, genIndus) != None:
        response = jsonify("Error adding Company")
        return response

    response = jsonify({"msg":"company registered"})
    return response


@app.route('/filter', methods=["POST"])
def filter():
    
    type = request.json.get("type", None)
    info = request.json.get("info", None)
    email = request.json.get("email", None)
    clID = getclientID(email)

    if type == "init":
        ret1 = getAllTestContractssAc()
        ret = []
        for x in ret1:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return json.dumps(ret, default=encoderCon)
        

    if type == "conlen":
        if info == "asc":
            ret = sortedConLenA(clID)
            #test = TestContracts.query.order_by(TestContracts.VOC.desc()).all()
            return json.dumps(ret, default=encoderCon)
        if info == "desc":
            ret = sortedConLenD(clID)
            return json.dumps(ret, default=encoderCon)

    if type == "officeremote":
        if info == "ioffice":
            ret = sortedIn(clID)
            return json.dumps(ret, default=encoderCon)
        if info == "remote":
            ret =sortRem(clID)
            return json.dumps(ret, default=encoderCon)

    if type == "value":
        
        if info == "asc":
            ret = sortValA(clID)
            return json.dumps(ret, default=encoderCon)
        if info == "desc":
            ret = sortValD(clID)
            return json.dumps(ret, default=encoderCon)
    
    if type == "proglang":
        ret = sortProgLan(info, clID)
        return json.dumps(ret, default=encoderCon)

    if type == "date":
        if info == "new":
            ret = sortDateD(clID)
            return json.dumps(ret, default=encoderCon)
        if info == "old":
            ret = sortDateA(clID)
            return json.dumps(ret, default=encoderCon)
    
    return jsonify("Error incorrect type")


@app.route('/block', methods=["POST"])
def block():
    email = request.json.get("email", None)
    comp = request.json.get("comp", None)
    IDCl = getclientID(email)
    IDC = getcompanyID(comp)
    initBlocks(IDCl, IDC)
    ret = getListWithoutBlock(IDCl)
    #print(ret)
    return json.dumps(ret, default=encoderCon)


########################################################
#    Routing to the different profile pages       #
########################################################
@app.route('/editClientProfile', methods=["POST"])
def clientProf():
    email = request.json.get("email", None)
    type = request.json.get("type", None)
    info = request.json.get("info", None)

    if type == "email":
        ID = getclientID(email)
        updateEmail(ID, info)
        return jsonify("Success: Updated Email")
    
    if type == "password":
        ID = getclientID(email)
        updatePassCL(ID, info)
        return jsonify("Succes: Updated password")

    if type == "avatar":
        ID = getclientID(email)
        updateAvatar(ID, info)
        return jsonify("Succes: Updated Avatar")

    if type == "progLan":
        ID = getclientID(email)
        updateProgLanCl(ID, info)
        return jsonify("Succes: Updated Programming Languages")

    if type == "experience":
        ID = getclientID(email)

        return jsonify("Succes: Updated Experience")


@app.route('/editCompanyProfile', methods=["POST"])
def companyProf():
    companyName = request.json.get("companyName", None)
    type = request.json.get("type", None)
    info = request.json.get("info", None)

    if type == "companyName":
        ID = getcompanyID(companyName)
        updateCompanyName(ID, info)
        return jsonify("Success: Updated Company Name")

    if type == "password":
        ID = getcompanyID(companyName)
        updatePassC(ID, info)
        return jsonify("Success: Updated Password")

    if type == "logo":
        ID = getcompanyID(companyName)
        updateCompLogo(ID, info)
        return jsonify("Success: Updated Logo")

    if type == "genindus":
        ID = getcompanyID(companyName)
        updateGenIndus(ID, info)
        return jsonify("Success: Updated General Industry")


# @app.route('/ComProfile', methods=["POST"])
# def companyProf():

@app.route('/addContract', methods=["POST"])
def addContractEP():
    conLen = request.json.get("conlen", None)

    inORem = request.json.get("iorem", None)
   
    voc = request.json.get("voc", None)

    compname = request.json.get("compname", None)

    active = request.json.get("active", None)
    
    prog = request.json.get("proglan", None)
   
    
    inrem = True
    act = True
    if inORem == "false":
        inrem = False
    if active == "false":
        act = False

    compID = getcompanyID(compname)
    date = datetime.now()
    pend = False


    if addContract(conLen, inrem, voc, date, pend, compID, 1, act, prog) != None:
        response = jsonify("Error adding Company")
        return response

    response = jsonify({"msg":"contract added"})
    return response


@app.route('/companyProfile', methods=["POST"])
def Comporf():
    compname = request.json.get("compname", None)
    IDC = getcompanyID(compname)
    ret = getCompany(IDC)
    if ret is None:
        return jsonify("Company doesn't exsist")
    return json.dumps(ret, default=encoderComp)

@app.route('/companyContracts', methods=["POST"])
def CompCon():
    compname = request.json.get("compname", None)
    IDC = getcompanyID(compname)
    ret = TestContracts.query.filter_by(companyID=IDC, clientID=1).all()
    if ret is None:
        return jsonify("Company has no contracts")
    return json.dumps(ret, default=encoderCon)


@app.route('/clientProfile', methods=["POST"])
def Clientporf():
    email = request.json.get("email", None)
    clID = getclientID(email)
    ret = getClient(clID)
    if ret is None:
        return jsonify("Client doesn't exsist")
    return json.dumps(ret, default=encoderCL)

@app.route('/clientContracts', methods=["POST"])
def ClientCon():
    email = request.json.get("email", None)
    clID = getclientID(email)
    ret = TestContracts.query.filter_by(clientID=clID).all()
    if ret is None:
        return jsonify("Client has no contracts")
    return json.dumps(ret, default=encoderCon)

@app.route('/apply', methods=["POST"])
def apply():
    email = request.json.get("email", None)
    conID = request.json.get("conID", None)
    compid = getCompanyID(conID)
    clID = getclientID(email)
    con = getTestContracts(conID)
    prog = []
    date = datetime.now()
    conLen = getContLen(conID)
    inrem = getinORem(conID)
    pend = False
    voc = getVOC(conID)
    act = getActive(conID)
    if addContract(conLen, inrem, voc, date, pend, compid, clID, act, prog) != None:
        response = jsonify("Error adding Company")
        return response
    if addApp(conID, compid, clID) != None:
        response = jsonify("Error adding application")
        return response

    response = jsonify({"msg":"application added"})
    return response

@app.route('/accept', methods=["POST"])
def accept():
    email = request.json.get("email", None)
    comname = request.json.get("companyname", None)
    conID = request.json.get("conID", None)
    clientID = getclientID(email)
    compID = getcompanyID(comname)
    acc = TestContracts.query.filter_by(contractID=conID).first()
    dele = TestContracts.query.filter(TestContracts.companyID==compID, TestContracts.contractID!=acc.contractID, TestContracts.clientID!=1).all()
    #print(acc)
    #print(dele)
    for x in dele:
        deleteTestContracts(x.contractID)
    updateActive(conID, False)
    updateTotEarned(clientID, acc.VOC)
    updatePend(conID)
    #print(getTotEarned(clientID))
    return jsonify("Test")
    



      
@app.route('/getcontracts', methods=["POST"])
def getContracts():
    companyname = request.json.get("companyname", None)
    compID = getcompanyID(companyname)
    ret = TestContracts.query.filter_by(companyID=compID, active=True).all()
    #print(ret)
    if ret is None:
        return jsonify("application change")
    return json.dumps(ret, default=encoderCon)

@app.route('/deleteaccount', methods=["POST"])
def delete():
    type = request.json.get("usertype", None)
    login = request.json.get("username", None)

    if type == "company":
        IDC = getcompanyID(login)
        deleteTestCompanies(IDC)
        return jsonify("Company deleted")

    if type == "client":
        clID = getclientID(login)
        deleteClient(clID)
        return jsonify("Client deleted")

    return jsonify("error")

    
@app.route('/getclients', methods=["POST"])
def getClients():
    companyname = request.json.get("companyname", None)
    compID = getcompanyID(companyname)
    conID = request.json.get("conID", None)
    ret = TestClients.query.join(applications).filter_by(companyID=compID).all()
    if ret is None:
        return jsonify("No clients")
    return json.dumps(ret, default=encoderCL)


##########################################################
###            Update queries for TestClients          ###
##########################################################

def updateEmail(clID, nE):
    cl = TestClients.query.filter_by(clientID=clID).first()
    if cl is None:
        return 0
    cl.email = nE
    db.session.commit()

def updatePassCL(clID, p):
    cl = TestClients.query.filter_by(clientID=clID).first()
    if cl is None:
        return 0
    cl.password = p
    db.session.commit()

def updateAvatar(clID, newAvatar):
    avat = TestClients.query.filter_by(clientID=clID).first()
    if avat is None:
        return 0
    avat.avatar = newAvatar
    db.session.commit()

def updateTotEarned(clID, newTotearned):
    totearn = TestClients.query.filter_by(clientID=clID).first()
    if totearn is None:
        return 0
    totearn.totalEarned = totearn.totalEarned + newTotearned
    db.session.commit()

##########################################################
###            Update queries for TestCompanies        ###
##########################################################

def updateCompanyName(cID, ncn):
    c = TestCompanies.query.filter_by(compID=cID).first()
    if c is None:
        return 0
    c.companyName = ncn
    db.session.commit()

def updatePassC(cID, p):
    c = TestCompanies.query.filter_by(compID=cID).first()
    if c is None:
        return 0
    c.password = p
    db.session.commit()

def updateCompLogo(cID, newCompLogo):
    compLogo = TestCompanies.query.filter_by(compID=cID).first()
    if compLogo is None:
        return 0
    compLogo.companyLogo = newCompLogo
    db.session.commit()

def updateGenIndus(cID, newGenIn):
    genIn = TestCompanies.query.filter_by(compID=cID).first()
    if genIn is None:
        return 0
    genIn.genIndus = newGenIn
    db.session.commit()


##########################################################
###            Update queries for TestContracts        ###
##########################################################

def updateConLen(conID, newConLen):
    conLen = TestContracts.query.filter_by(contractID=conID).first()
    if conLen is None:
        return 0
    conLen.TestContractsLen = newConLen
    db.session.commit()

def updateInORem(conID, newInOR):
    inRem = TestContracts.query.filter_by(contractID=conID).first()
    if inRem is None:
        return 0
    inRem.inORem = newInOR
    db.session.commit()

def updateVOC(conID, newVOC):
    voc = TestContracts.query.filter_by(contractID=conID).first()
    if voc is None:
        return 0
    voc.VOC = newVOC
    db.session.commit()

def updateDatep(conID, newDatep):
    date = TestContracts.query.filter_by(contractID=conID).first()
    if date is None:
        return 0
    date.datep = newDatep
    db.session.commit()

def updateCompanyID(conID, newCompID):
    compID = TestContracts.query.filter_by(contractID=conID).first()
    if compID is None:
        return 0
    compID.companyID = newCompID
    db.session.commit()

def updateClientID(conID, newClientID):
    clientID = TestContracts.query.filter_by(contractID=conID).first()
    #print(clientID)
    if clientID is None:
        return 0
    clientID.clientID = newClientID
    db.session.commit()

def updateActive(conID, newAct):
    act = TestContracts.query.filter_by(contractID=conID).first()
    if act is None:
        return 0
    act.active = newAct
    db.session.commit()
    if newAct == True:
        addPendCon(conID)
    if newAct == False:
        deletePenCon(conID)

def updatePend(conID):
    con = TestContracts.query.filter_by(contractID=conID).first()
    if con is None:
        return 0
    con.pending = True
    db.session.commit()
    

##########################################################
###            Creation  queries                       ###
##########################################################

def addClient(e, p, a, prog):
    cl = TestClients(e, p, a, 0)
    #try:
    db.session.add(cl)
    db.session.commit()
    ID = getclientID(e)
    progLan = checkLanCL(ID, prog)
    #progBlock = initBlocks(ID)
        #token = generate_confirmation_token(cl.email)
    #except:
    #    return "failed to add Client"

def addContract(cl, inoR, voc, dp, pend, compID, clientID, act, prog):
    con = TestContracts(cl, inoR, voc, dp, pend, compID, clientID, act)
    #try:
    db.session.add(con)
    db.session.commit()
    ID = getConID(cl, inoR, voc, dp, compID, clientID, act)
    progLan = checkLanCon(ID, prog)
    if act == True:
        addPendCon(ID)
    #except:
        return "failed to add Contract"

def addCompany(cn, p, cl, gi):
    c = TestCompanies(cn, p, cl , gi)
    #try:
    db.session.add(c)
    db.session.commit()
    #except:
        #return "failed to add Contract"

def addprogLanCl(clID, java, C, CSharp, Cplusplus, React, Python, Assem):
    prcl = TestProgrammingLanCL(clID, java, C, CSharp, Cplusplus, React, Python, Assem)
    try:
        db.session.add(prcl)
        db.session.commit()
    except:
        return "failed to add progLanCL"

def addprogLanCon(conID, java, C, CSharp, Cplusplus, React, Python, Assem):
    prcl = TestProgrammingLanCon(conID, java, C, CSharp, Cplusplus, React, Python, Assem)
    try:
        db.session.add(prcl)
        db.session.commit()
    except:
        return "failed to add progLanCL"


def addPendCon(ID):
    pen = PendingCon(ID)
    try:
        db.session.add(pen)
        db.session.commit()
    except:
        return "failed to add pendingContract"

def initBlocks(clientID, compID):
    block = BlockedCompanies(compID, clientID, True)
    try:
        print(block)
        db.session.add(block)
        db.session.commit()
    except:
        return "failed to add blocked companies"


def addApp(conID, compID, clientID):
    app = applications(conID, compID, clientID)
    try:
        db.session.add(app)
        db.session.commit()
    except:
        return "failed to add applications"


##########################################################
###            Get queries for TestClients             ###
##########################################################

def getclientID(em):
    clID = TestClients.query.filter_by(email=em).first()
    if clID is None:
        return 0
    return clID.clientID

def getClient(clID):
    cl = TestClients.query.filter_by(clientID=clID).first()
    if cl is None:
        return  0
    return cl

def getEmailCl(clID):
    email = TestClients.query.filter_by(clientID=clID).first()
    if email is None:
        return  0
    return email.email

def getPasswordCL(clID):
    passwordH = TestClients.query.filter_by(clientID=clID).first()
    if passwordH is None:
        return  0
    return passwordH.password

def getAvatar(clID):
    avat = TestClients.query.filter_by(clientID=clID).first()
    if avat is None:
        return  0
    return avat.avatar

def getTotEarned(clID):
    totE = TestClients.query.filter_by(clientID=clID).first()
    if totE is None:
        return 0
    return totE.totalEarned

def getAllTestClients():
    testClients = TestClients.query.all()
    if testClients is None:
        return 0
    return testClients
##########################################################
###            Get queries for Applications            ###
##########################################################

def getclientIDApp(compID, conID):
    client = applications.query.filter_by(contractID=conID, companyID=compID).first()
    #print(compID)
    #print(conID)
    if client is None:
        return 0
    return client.clientID



##########################################################
###            Get queries for TestCompanies           ###
########################################################## 

def getcompanyID(ComName):
    comID = TestCompanies.query.filter_by(companyName=ComName).first()
    if comID is None:
        return  0
    return comID.compID
    
def getCompany(cID):
    company = TestCompanies.query.filter_by(compID=cID).first()
    if company is None:
        return  0
    return company

def getCompanyName(cID):
    compName = TestCompanies.query.filter_by(compID=cID).first()
    if compName is None:
        return  0
    return compName.companyName

def getPasswordC(cID):
    passwordH = TestCompanies.query.filter_by(compID=cID).first()
    if passwordH is None:
        return  0
    return passwordH.password

def getCompanyLogo(cID):
    compLogo = TestCompanies.query.filter_by(compID=cID).first()
    if compLogo is None:
        return  0
    return compLogo.companyLogo

def getGeneralIndus(cID):
    genIn = TestCompanies.query.filter_by(compID=cID).first()
    if genIn is None:
        return  0
    return genIn.genIndus

def getAllTestCompanies():
    testCompanies = TestCompanies.query.all()
    if testCompanies is None:
        return  0
    return testCompanies

##########################################################
###            Get queries for TestContracts           ###
##########################################################

def getConID(cl, inoR, voc, dp, compID, clientID, act):
    con = TestContracts.query.filter_by(contractLen=cl, inORem=inoR, VOC=voc, datep=dp, companyID=compID, clientID=clientID, active=act).first()
    if con is None:
        return 0
    return con.contractID

def getTestContracts(conID):
    testContracts = TestContracts.query.filter_by(contractID=conID).first()
    if testContracts is None:
        return  0
    return TestContracts

def getContLen(conID):
    conLen = TestContracts.query.filter_by(contractID=conID).first()
    if conLen is None:
        return  0
    return conLen.contractLen

def getinORem(conID):
    inRem = TestContracts.query.filter_by(contractID=conID).first()
    if inRem is None:
        return  0
    return inRem.inORem

def getVOC(conID):
    voc = TestContracts.query.filter_by(contractID=conID).first()
    if voc is None:
        return  0
    return voc.VOC

def getDatep(conID):
    date = TestContracts.query.filter_by(contractID=conID).first()
    if date is None:
        return  0
    return date.datep

def getCompanyID(conID):
    compID = TestContracts.query.filter_by(contractID=conID).first()
    if compID is None:
        return  0
    return compID.companyID

def getClientID(conID):
    clientID = TestContracts.query.filter_by(contractID=conID).first()
    if clientID is None:
        return  0
    return clientID.clientID

def getActive(conID):
    act = TestContracts.query.filter_by(contractID=conID).first()
    if act is None:
        return  0
    return act.active

def getPending(conID):
    act = TestContracts.query.filter_by(contractID=conID).first()
    if act is None:
        return  0
    return act.pending

def getAllTestContractss():
    testContractss = TestContracts.query.filter_by(active=True).all()
    # for x in testContractss:
    #      if checkBlock(x.clientID, x.companyID):
    #          testContractss.pop(x)
    if testContractss is None:
        return  0
    return testContractss

def getAllTestContractssAc():
    testContractss = TestContracts.query.filter_by(active=True, clientID=1).all()
    #print(testContractss)
    # for x in testContractss:
    #      if checkBlock(x.clientID, x.companyID):
    #          testContractss.pop(x)
    if testContractss is None:
        return  0
    return testContractss

##########################################################
###      Get queries for TestClientsProgrammingLan     ###
##########################################################

def getJavaCl(clID):
    jav = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if jav is None:
        return 0
    return jav.java

def getCCl(clID):
    C = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if C is None:
        return 0
    return C.C

def getCSharpCl(clID):
    CSharp = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if CSharp is None:
        return 0
    return CSharp.CSharp

def getCplusplusCl(clID):
    Cplusplus = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if Cplusplus is None:
        return 0
    return Cplusplus.Cplusplus

def getReactCl(clID):
    React = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if React is None:
        return 0
    return React.React

def getPythonCl(clID):
    Python = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if Python is None:
        return 0
    return Python.Python

def getAssemCl(clID):
    Assem = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if Assem is None:
        return 0
    return Assem.Assem

def getProgLanCl(clID):
    proglan = TestProgrammingLanCL.query.filter_by(ClientID=clID)
    if proglan is None:
        return 0
    return proglan


# ##########################################################
# ###     Get queries for TestContractsProgrammingLan    ###
# ##########################################################

def getJavaCon(ConID):
    jav = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if jav is None:
        return 0
    return jav.java

def getCCon(ConID):
    C = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if C is None:
        return 0
    return C.C

def getCSharpCon(ConID):
    CSharp = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if CSharp is None:
        return 0
    return CSharp.CSharp

def getCplusplusCon(ConID):
    Cplusplus = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if Cplusplus is None:
        return 0
    return Cplusplus.Cplusplus

def getReactCon(ConID):
    React = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if React is None:
        return 0
    return React.React

def getPythonCon(ConID):
    Python = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if Python is None:
        return 0
    return Python.Python

def getAssemCon(ConID):
    Assem = TestProgrammingLanCon.query.filter_by(ContractID=ConID)
    if Assem is None:
        return 0
    return Assem.Assem

def getProgLanCon(ConID):
    proglan = TestProgrammingLanCon.query.filter_by(ContractID=ConID).all()
    if proglan is None:
        return 0
    return proglan



##########################################################
###            Deletion  queries                        ##
##########################################################

def deleteClient(clID):
    dele = TestContracts.query.filter_by(clientID=clID).all()
    TestProgrammingLanCL.query.filter_by(ClientID=clID).delete()
    for x in  dele:
        deleteTestContracts(x.contractID)
    BlockedCompanies.query.filter_by(clientID=clID).delete()
    TestClients.query.filter_by(clientID=clID).delete()
    db.session.commit()

def deleteTestContracts(conID):
    TestProgrammingLanCon.query.filter_by(ContractID=conID).delete()
    PendingCon.query.filter_by(contractID=conID).delete()
    applications.query.filter_by(contractID=conID).delete()
    TestContracts.query.filter_by(contractID=conID).delete()
    db.session.commit()

def deleteTestCompanies(cID):
    dele = TestContracts.query.filter_by(companyID=cID).all()
    for x in  dele:
        deleteTestContracts(x.contractID)
    BlockedCompanies.query.filter_by(companyID=cID).delete()
    TestCompanies.query.filter_by(compID=cID).delete()



    
    TestCompanies.query.filter_by(compID=cID).delete()
    db.session.commit()

def deletePenCon(conID):
    PendingCon.query.filter_by(contractID=conID).delete()
    db.session.commit()




##########################################################
###                    Sort queries                     ##
##########################################################

def sortedConLenA(clID):
    sorConL = TestContracts.query.filter_by(active=True).order_by(TestContracts.contractLen).all()
    ret = []
    for x in sorConL:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortedConLenD(clID):
    sorConL = TestContracts.query.filter_by(active=True).order_by(TestContracts.contractLen.desc()).all()
    ret = []
    for x in sorConL:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortedIn(clID):
    inO = TestContracts.query.filter_by(inORem=True, active=True).all()
    ret = []
    for x in inO:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortRem(clID):
    rem = TestContracts.query.filter_by(inORem=False, active=True).all()
    ret = []
    for x in rem:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortValA(clID):
    val = TestContracts.query.filter_by(active=True).order_by(TestContracts.VOC).all()
    ret = []
    for x in val:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortValD(clID):
    val = TestContracts.query.filter_by(active=True).order_by(TestContracts.VOC.desc()).all()
    ret = []
    for x in val:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortProgLan(lan, clID):

    if lan == "java":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(java=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    if lan == "C":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(C=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    if lan == "Csharp":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(CSharp=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    if lan == "Cplusplus":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(Cplusplus=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    if lan == "react":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(React=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    if lan == "python":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(Python=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    if lan == "Assem":
        prog = TestContracts.query.filter_by(active=True).join(TestProgrammingLanCon).filter_by(Assem=True).all()
        ret = []
        for x in prog:
            if not checkBlock(clID, x.companyID):
                ret.append(x)       
        if ret is None:
            return  0
        return ret
    return "Error"

def sortDateA(clID):
    date = TestContracts.query.filter_by(active=True).order_by(TestContracts.datep).all()
    ret = []
    for x in date:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

def sortDateD(clID):
    date = TestContracts.query.filter_by(active=True).order_by(TestContracts.datep.desc()).all()
    ret = []
    for x in date:
        if not checkBlock(clID, x.companyID):
            ret.append(x)       
    if ret is None:
        return  0
    return ret

    


def checkLanCL(clID, progLan):
    test = TestProgrammingLanCL(clID, False, False, False, False, False, False, False)

    for x in progLan:
        if x == "java":
            test.java = True
        if x == "C":
            test.C = True
        if x == "CSharp":
            test.CSharp = True
        if x == "Cplusplus":
            test.Cplusplus = True
        if x == "Assem":
            test.Assem = True
        if x == "react":
            test.React = True
        if x == "Python":
            test.Python = True

    db.session.add(test)
    db.session.commit()
    
    return "Success"

def checkLanCon(conID, progLan):
    test = TestProgrammingLanCon(conID, False, False, False, False, False, False, False)

    for x in progLan:
        if x == "java":
            test.java = True
        if x == "C":
            test.C = True
        if x == "CSharp":
            test.CSharp = True
        if x == "Cplusplus":
            test.Cplusplus = True
        if x == "Assem":
            test.Assem = True
        if x == "react":
            test.React = True
        if x == "Python":
            test.Python = True

    db.session.add(test)
    db.session.commit()
    
    return "Success"

def updateProgLanCl(ID, progs):
    test = TestProgrammingLanCL.query.filter_by(ClientID=ID).first()
    test.java = False
    test.C = False
    test.CSharp = False
    test.Cplusplus = False
    test.Assem = False
    test.React = False
    test.Python = False

    for x in progs:
        if x == "java":
            test.java = True
        if x == "C":
            test.C = True
        if x == "CSharp":
            test.CSharp = True
        if x == "Cplusplus":
            test.Cplusplus = True
        if x == "Assem":
            test.Assem = True
        if x == "react":
            test.React = True
        if x == "Python":
            test.Python = True
    db.session.commit()

def checkBlock(IDCl, IDC):
    block = BlockedCompanies.query.filter_by(clientID=IDCl, companyID=IDC).first()
    if block is None:
        return False
    else: 
        return True

def getListWithoutBlock(clID):
    con = getAllTestContractss()
    ret = []
    for x in con:
        if not checkBlock(clID, x.companyID):
            ret.append(x) 
    print(ret)      
    if ret is None:
            return  0
    return ret

##########################################################
###                   Confirm email                     ##
##########################################################

# @app.route('/confirm/<token>')
# def confirm_email(token):
#     try:
#         email = confirm_token(token)
#     except:
#         flash('The confirmation link is invalid or has expired.', 'danger')
#     cl = TestClients.query.filter_by(email = email).first_or_404()
#     if cl.confirmed:
#         flash('Account already confirmed, Please login.', 'success')
#     else:
#         cl.confirmed = True
#         cl.confirmed_on = datetime.datetime.now()
#         db.session.add(cl)
#         db.session.commit()
#         flash('You have confirmed your account. Thanks!', 'success')
#     return redirect(url_for('main_home'))



##########################################################
###                   Encoder Functions                 ##
##########################################################

def jsonCon(contracts):
    retList = []
    for x in contracts:
        if isinstance(x, TestContracts):
            json_con = json.dumps(x, default=encoderCon)
            retList.append(json_con)
    return retList      

def encoderCon(contract):
    return {"conID": contract.contractID, 
            "CompanyName": getCompanyName(contract.companyID),
            "conlen": contract.contractLen, 
            "email": getEmailCl(contract.clientID),
            "inORem": contract.inORem, 
            "value": contract.VOC, 
            "date": str(contract.datep), 
            "pending": contract.pending,
            "compID": contract.companyID, 
            "clientID": contract.clientID, 
            "active": contract.active,
            "clientapp": getclientIDApp(contract.companyID, contract.contractID)}  

def encoderComp(company):
    return {"compID": company.compID,
            "password": company.password,
            "logo": company.companyLogo,
            "gen": company.genIndus}

def encoderCL(client):
    return {"clientID": client.clientID,
            "email": client.email,
            "password": client.password,
            "avatar": client.avatar,
            "totearn": client.totalEarned}

def encoderApp(app):
    return {"clientID": app.clientID,
            "compID": app.companyID,
            "conID": app.contractID}
