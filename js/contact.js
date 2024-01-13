$(function(){
    $('#contact-submit-form').submit(function(event){
        event.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let message = $('#message').val();

        let isValueOk = true;
        if(name.length<=0 || email.length<=0 || message.length<=0)
            isValueOk = false;

        if(isValueOk)
            sendMessage(name, email, message);
    });

    function sendMessage(name, email, message){
        let formData = {name:name, email:email, message};

        let url = '';
        try{
            $.ajax({
                type: 'POST', 
                url: url, 
                data: formData,
                beforeSend: function() {
                    
                },
                success: function(response) {
                    alertify.success('Success!');
                },
                error: function(error) {
                    alertify.error('Please, Try Again!..');
                },
                complete: function() {
                }
            });
        }catch(err){
            alertify.error('Please, Try Again!');
        }
    }
});