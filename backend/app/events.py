from flask_socketio import emit, join_room, leave_room
from . import socketio

# A dictionary to keep track of active users and their roles
# In a real application, you would use a database for this.
online_users = {}

@socketio.on('connect')
def handle_connect():
    """
    Handles a new client connection.
    """
    print('Client connected!')
    emit('response', {'message': 'Successfully connected to the server!'})

@socketio.on('disconnect')
def handle_disconnect():
    """
    Handles a client disconnection.
    """
    # Here you would add logic to remove a user from online_users
    print('Client disconnected!')

@socketio.on('join_chat')
def handle_join_chat(data):
    """
    Allows a user to join a specific chat room.
    The data should include a 'room' identifier (e.g., a conversation ID).
    """
    username = data.get('username', 'Anonymous')
    room = data.get('room')
    if not room:
        return

    join_room(room)
    print(f'{username} has joined room: {room}')
    # Notify others in the room that a user has joined
    emit('chat_message', {'message': f'{username} has entered the chat.'}, to=room)


@socketio.on('leave_chat')
def handle_leave_chat(data):
    """
    Allows a user to leave a chat room.
    """
    username = data.get('username', 'Anonymous')
    room = data.get('room')
    if not room:
        return

    leave_room(room)
    print(f'{username} has left room: {room}')
    # Notify others in the room that a user has left
    emit('chat_message', {'message': f'{username} has left the chat.'}, to=room)


@socketio.on('send_message')
def handle_send_message(data):
    """
    Handles receiving a message and broadcasting it to the correct room.
    """
    room = data.get('room')
    message = data.get('message')
    username = data.get('username')

    if not all([room, message, username]):
        return # Ignore incomplete messages

    print(f'Received message from {username} for room {room}: {message}')
    # Broadcast the message to all clients in the specified room
    emit('chat_message', {'username': username, 'message': message}, to=room)

