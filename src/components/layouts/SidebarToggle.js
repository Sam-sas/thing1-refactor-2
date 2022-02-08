import React, { useState } from "react";
import { Button, ButtonToolbar, Drawer } from "rsuite";
import Navigation from "../navigation/Navigation";
import MenuIcon from '@rsuite/icons/Menu';
import CloseIcon from '@rsuite/icons/Close';

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
            <Button className="text-white blue-background z-999" onClick={() => handleOpen('left')}>
              <MenuIcon size="5em" />
            </Button>
          </ButtonToolbar>
    
          <Drawer full className="w-100 h-100" placement={placement} open={open} onClose={() => setOpen(false)}>
            <Drawer.Body className="mt-2 blue-background text-white">
            <Drawer.Actions className="padded">
                <Button onClick={() => setOpen(false)} className="orange-background text-white"><CloseIcon size='3em' /></Button>
              </Drawer.Actions>
              <Navigation />
            </Drawer.Body>
          </Drawer>
        </div>
      );
}
