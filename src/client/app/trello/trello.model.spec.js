/* jshint -W117, -W030 */
describe('Trello Model', function() {
    beforeEach(function() {
    });

    beforeEach(function () {
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Trello Card', function() {
        it('should be created successfully', function () {
            var card = new app.trello.Ticket();
            expect(card).to.be.defined;
        });
        
        it('should has the right parameters', function (){
            var card = new app.trello.Ticket("title", "description", ['green', 'red', 'refactor'])
            expect(card.title).to.be.equal("title");
            expect(card.description).to.be.equal("description");
            expect(card.labels.length).to.be.equal(3);
        })
        
        it('should stringify the labels with coma-separated', function (){
            var card = new app.trello.Ticket("title", "description", ['green', 'red', 'refactor'])
            expect(card.stringifiedLabels()).to.be.equal("green,red,refactor");
        });
        
        it('should stringify the member\'s id with coma-separated', function (){
            var card = new app.trello.Ticket();
            var member1 = new app.trello.Member({
                fullName : "fullName1",id : "id1" , username :"username1"
            });
            var member2 = new app.trello.Member({
                fullName : "fullName2",id : "id2" , username :"username2"
            });
            
            card.assignedTo = [ member1, member2];
            
            expect(card.stringifiedMembers()).to.be.equal("id1,id2");
        });
        
    });
});
