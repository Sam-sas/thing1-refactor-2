import React, { useState } from "react";
import { Button, ButtonToolbar, Drawer } from "rsuite";
import Navigation from "../navigation/Navigation";

export default function SidebarToggle() {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const handleOpen = key => {
        setOpen(true);
        setPlacement(key);
      };

    return (
        <div>
          <ButtonToolbar>
            <Button className="text-white blue-background" onClick={() => handleOpen('left')}>
              Hamburger here
            </Button>
          </ButtonToolbar>
    
          <Drawer full className="w-100 h-100" placement={placement} open={open} onClose={() => setOpen(false)}>
            <Drawer.Body className="mt-2 blue-background">
            <Drawer.Actions className="padded">
                <Button onClick={() => setOpen(false)}>Close</Button>
              </Drawer.Actions>
              <Navigation />
            </Drawer.Body>
          </Drawer>
        </div>
      );
}
