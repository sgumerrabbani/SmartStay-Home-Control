import { Button } from "@/components/ui/button";

interface RoomPillsProps {
  rooms: string[];
  activeRoom: string;
  onRoomSelect: (room: string) => void;
}

export default function RoomPills({ rooms, activeRoom, onRoomSelect }: RoomPillsProps) {
  return (
    <div 
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" 
      role="tablist" 
      aria-label="Rooms"
      data-testid="room-pills"
    >
      {rooms.map((room) => {
        const isActive = activeRoom === room;
        return (
          <Button
            key={room}
            role="tab"
            aria-selected={isActive}
            variant="ghost"
            className={`rounded-full px-4 py-2 flex-shrink-0 transition-all border ${
              isActive 
                ? "border-primary bg-primary/5 text-primary shadow-sm" 
                : "border-transparent bg-card hover:bg-muted"
            }`}
            onClick={() => onRoomSelect(room)}
            data-testid={`button-room-${room.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {room}
          </Button>
        );
      })}
    </div>
  );
}
