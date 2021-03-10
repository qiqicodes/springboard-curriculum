// describe("Servers test (with setup and tear-down)", function() {
//     beforeEach(function () {
//       // initialization logic
//       serverNameInput.value = 'Alice';
//     });
  
//     it('should add a new server to allServers on submitServerInfo()', function () {
//       // when submit server form
//       submitServerInfo();
  
//       // there should be only one key, in the length of allServer Obj. 
//       expect(Object.keys(allServers).length).toEqual(1);
//       // the value of the key is "Alice"
//       expect(allServers['server' + serverId].serverName).toEqual('Alice');
//     });
  
//     it("should not add a new server toAllServers on submitServerInfo() with empty input", function() {
//       //when submitting an empty value of server form
//       serverNameInput.value = '';
//       submitServerInfo();
  
//       //there is no addition to allServer.
//       expect(Object.keys(allServers).length).toEqual(0);
//     });
  
  
//   it("update #servertable when running updateServerTable()", function() { 
//    //when submitting server form, and update server table function executes 
//    submitServerInfo();
//    updateServerTable();
  
//    //check the current #serverTable
//    let curTdList = document.querySelectorAll("#serverTable tbody tr td");
//    // three tests has run so far, the table should have 3 submits
//     expect(curTdList.length).toEqual(2);
//     expect(curTdList[0].innerText).toEqual("Alice");
//     expect(curTdList[1].innerText).toEqual("$0.00");
//   });
//     afterEach(function() {
//       // teardown logic
//       serverId = 0;
//       allServers = {};
//       serverTbody.remove();
//     });
//   });
  
  
//   Get a feel for testing your own code

// First we will build out functionality for removing a server from the server table

// Review the functionality of appendTd(tr, value)

// Create a appendDeleteBtn(tr), it will be similar to append(tr, value). This function will create a ‘td’ with the value ‘X’, when clicked it will delete the table row it belongs to

// Write the functionality for appending a ‘td’ to a ‘tr’ with the value ‘X’

// Set an click event listener on the ‘td’ that will remove the parent ‘tr’ from the dom. You will have to find a way to access the parent row of the ‘td’ from the click event

// Write tests for appendDeleteBtn(tr)

// You may notice the difficulty of simulating a click with vanilla javascript so do not spend too much time on testing the html after the DOM is updated (later we will study approaches for this with other libraries).

// Repeat the process for removing a payment from the payment table