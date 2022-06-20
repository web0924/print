var WebReader=
{
	OBJ:function()
	{
		var reader={};
		var SocketOpen=false;
		var socket=null;
		var target=null;

		reader.onResult=function(func){
            target.addEvent("Result", func);
        };
        
		var WSonOpen=function(){
            SocketOpen=true;
		};
		
		var WSonMessage=function(msg){
			var str = "";
			str = msg.data; 
			
			var resultData = 
			{
                type:"Result",
				strStatus: str.substr(4,2),
				strData: str.substr(6),
				strCmdCode: str.substr(0,4),
            };
			
            if(target!=null)
                target.fireEvent(resultData);
		};
		
        var WSonClose=function(){
            SocketOpen=false;
		};
		
        var WSonError=function(){
            alert("Server not running !");
		};
		
        reader.createSocket=function(){
            try{
                if ("WebSocket" in window){
                    socket = new WebSocket("ws://localhost:39002/RFID Reader Service");
                }
                else if("MozWebSocket" in window){
                    socket = new MozWebSocket("ws://localhost:39002/RFID Reader Service");
                }
                else{
                    alert("None");
                    return false;
                }
                socket.onopen= WSonOpen;
                socket.onmessage= WSonMessage;
                socket.onclose= WSonClose;
                socket.onerror= WSonError;
                target = new EventTarget();
                return true;
            }
            catch (ex){
                return false;
            }
		};
		
		reader.Disconnect=function(){
            if(socket!=null)
                socket.close();
		};
		
		reader.send = function(strParam){
			socket.send(strParam);
		}

        return reader;
    }
};

function EventTarget()
{
    this.handlers = {}; 
}

EventTarget.prototype = 
{
	constructor: EventTarget,

	addEvent: function(type, handler) 
	{
		if(typeof this.handlers[type] == 'undefined') 
		{
			this.handlers[type] = []; 
		}
		this.handlers[type].push(handler); 
	},

	fireEvent: function(event) 
	{
		if(!event.target) 
		{
            event.target = this;
        }
		if(this.handlers[event.type] instanceof Array) 
		{
			var handlers = this.handlers[event.type];
			for(var i = 0; i < handlers.length; i++)
			{
                handlers[i](event);
            }
		}
	},

	removeEvent: function(type, handler) 
	{
		if(this.handlers[type] instanceof Array)
		{
            var handlers = this.handlers[type]; 
			for(var i = 0; i < handlers.length; i++)
			{
                if(handlers[i] == handler){break;}
            }
            handlers.splice(i, 1);
        }
    }
};

try
{
 var reader = WebReader.OBJ();
}
catch(e)
{
}

if(!reader.createSocket())
{
}


export default reader